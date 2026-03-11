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
}
