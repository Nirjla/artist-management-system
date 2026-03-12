<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Inertia\Inertia;

class UserController extends Controller
{
    public function index()
    {

        $users = DB::select("select id, first_name, last_name, email, phone, dob, gender, address, created_at, updated_at from users");
        return Inertia::render('Users/Index', ['users' => $users]);
    }


    public function store(Request $request)
    {
        $request->validate([
            'first_name' => 'required|string|min:2|max:20|regex:/^[a-zA-Z ]+$/',
            'last_name' => 'required|string|min:2|max:20|regex:/^[a-zA-Z ]+$/',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8',
            'phone' => 'required|numeric|digits:10',
            'dob' => 'required|date',
            'gender' => 'required|in:m,f,o',
            'address' => 'required|string|min:2|max:10|regex:/^[a-zA-Z ]+$/',
        ]);
        DB::insert("insert into users (id, first_name, last_name, email, password, phone, dob, gender, address, created_at, updated_at) 
                    values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", [
            (string) Str::uuid(),
            $request->first_name,
            $request->last_name,
            $request->email,
            Hash::make($request->password),
            $request->phone,
            $request->dob,
            $request->gender,
            $request->address,
            now(),
            now()
        ]);

        return redirect()->route('user.index')->with('success', 'User created successfully.');
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'first_name' => 'required|string|min:2|max:20|regex:/^[a-zA-Z ]+$/',
            'last_name' => 'required|string|min:2|max:20|regex:/^[a-zA-Z ]+$/',
            'email' => 'required|string|email|max:255|unique:users,email,' . $id,
            'phone' => 'required|numeric|digits:10',
            'dob' => 'required|date',
            'gender' => 'required|in:m,f,o',
            'address' => 'required|string|min:2|max:10|regex:/^[a-zA-Z ]+$/',
        ]);
        DB::update("update users set first_name = ?, last_name = ?, email = ?, phone = ?, dob = ?, gender = ?, address = ?, updated_at = ? where id = ?", [
            $request->first_name,
            $request->last_name,
            $request->email,
            $request->phone,
            $request->dob,
            $request->gender,
            $request->address,
            now(),
            $id
        ]);
        return redirect()->route('user.index')->with('success', 'User updated successfully.');
    }

    public function destroy($id)
    {
        DB::delete("delete from users where id = ?", [$id]);
        return redirect()->route('user.index')->with('success', 'User deleted successfully.');
    }

}
