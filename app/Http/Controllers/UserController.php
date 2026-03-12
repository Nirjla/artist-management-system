<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
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
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8',
            'phone' => 'required|string|max:20',
            'dob' => 'required|date',
            'gender' => 'required|in:m,f,o',
            'address' => 'required|string',
        ]);
        DB::insert("insert into users (first_name, last_name, email, password, phone, dob, gender, address, created_at, updated_at) 
                    values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", [
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
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users,email,' . $id,
            'phone' => 'required|string|max:20',
            'dob' => 'required|date',
            'gender' => 'required|in:m,f,o',
            'address' => 'required|string',
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
