<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use Inertia\Inertia;


class ArtistController extends Controller
{

    public function index()
    {
        $artists = DB::select("select * from artists order by created_at desc");
        return Inertia::render('Artists/Index', [
            'artists' => $artists
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:150',
            'dob' => 'required|date',
            'gender' => 'required|in;m,f,o',
            'address' => 'required|string',
            'first_release_year' => 'required|integer|min:1900|max:' . date('Y'),
            'no_of_albums_released' => 'required|integer|min:0'
        ]);

        DB::insert("insert into artists (name, dob, gender, address, first_release_year, no_of_albums_released, created_at, updated_at) 
                values (?, ?, ?, ?, ?, ?, ?, ?)", [
            $request->name,
            $request->dob,
            $request->gender,
            $request->address,
            $request->first_release_year,
            $request->no_of_albums_released,
            now(),
            now()
        ]);

        return redirect()->route("artist.index")->with("success", "Artist created successfully");
    }


    public function update(Request $request, $id)
    {
        $request->validate([
            'name' => 'required|string|max:150',
            'dob' => 'required|date',
            'gender' => 'required|in:m,f,o',
            'address' => 'required|string',
            'first_release_year' => 'required|integer|min:1900|max:' . date('Y'),
            'no_of_albums_released' => 'required|integer|min:0'
        ]);

        DB::update("update artists set name = ?, dob = ?, gender = ?, address = ?, first_release_year = ?, no_of_albums_released = ?, updated_at = ? where id = ?", [
            $request->name,
            $request->dob,
            $request->gender,
            $request->address,
            $request->first_release_year,
            $request->no_of_albums_released,
            now(),
            $id
        ]);

        return redirect()->route("artist.index")->with("success", "Artist updated successfully");
    }

    public function destroy($id)
    {
        DB::delete("delete from artists where id = ?", [$id]);
        return redirect()->route("artist.index")->with("success", "Artist deleted successfully");
    }

    public function export()
    {
        $artists = DB::select("select name, dob , gender, address, first_release_year, no_ofalbums_releases from artists");

        $filename = "artists_export_" . date('Y-m-d') . ".csv";
        $handle = fopen('php://temp', 'w');

        header('Content-Type: text/csv');
        header('Content-Disposition: attachment; filename="' . $filename . '"');

        fputcsv($handle, ['Name', 'DOB', 'Gender', 'Address', 'First Release Year', 'No. of Albums Released']);

        foreach ($artists as $artist) {
            fputcsv($handle, [
                $artist->name,
                $artist->dob,
                $artist->gender,
                $artist->address,
                $artist->first_release_year,
                $artist->no_of_albums_released
            ]);
        }

        fclose($handle);
    }


    public function import(Request $request)
    {
        $request->validate([
            'file' => 'required|file|mimes:csv|max:2048'
        ]);

        $file = $request->file('file');
        $handle = fopen($file->getPathname(), 'r');

        fgetcsv($handle);

        while (($row = fgetcsv($handle)) !== false) {
            DB::insert("insert into artists (name, dob, gender, address, first_release_year, no_of_albums_released, created_at, updated_at) 
                values (?, ?, ?, ?, ?, ?, ?, ?)", [
                $row[0],
                $row[1],
                $row[2],
                $row[3],
                $row[4],
                $row[5],
                now(),
                now()
            ]);
        }

        fclose($handle);

        return redirect()->route("artist.index")->with("success", "Artists imported successfully");
    }
}
