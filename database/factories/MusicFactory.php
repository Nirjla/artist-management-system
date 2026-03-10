<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Artist;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Music>
 */
class MusicFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'artist_id' => Artist::factory(),
            'title' => $this->faker->sentence(3),
            'album_name' => $this->faker->sentence(3),
            'genre' => $this->faker->randomElement(['rnb', 'country', 'classic', 'rock', 'jazz']),
            'created_at' => now(),
            'updated_at' => now(),
        ];
    }
}
