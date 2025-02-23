<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;

class AdminUserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::factory()->create([
            'name' => 'Admin',
            'email' => 'admin@admin.it',
            'email_verified_at' => NULL,
            'password' => '$2y$12$0BlHUdRpGH/sBgzcvbk4vOJ96jXhAeieCnuthDAQ7qAOmGDq4czw.',
            'remember_token' => NULL,
            'admin' => 1
        ]);
    }
}
