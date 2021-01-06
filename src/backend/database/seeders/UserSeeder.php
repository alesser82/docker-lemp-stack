<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        User::insert([
            [
                'email' => 'muhrama082@gmail.com',
                'name' => 'Administrator 1',
                'username' => 'admin',
                'password' => bcrypt('admin'),
                'role' => 'Administrator'
            ],
            [
                'email' => 'user@gmail.com',
                'name' => 'User 1',
                'username' => 'user',
                'password' => bcrypt('user'),
                'role' => 'Operator'
            ]
        ]);
    }
}
