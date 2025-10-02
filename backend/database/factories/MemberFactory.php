<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Member>
 */
class MemberFactory extends Factory
{
    public function definition(): array
    {
        return [
            'member_id' => 'MB' . $this->faker->unique()->numberBetween(1000, 9999),
            'name'      => $this->faker->name(),
            'gender'      => $this->faker->boolean(),
            'email'     => $this->faker->unique()->safeEmail(),
            'dob'       => $this->faker->date('Y-m-d', '2010-01-01'),
            'role'      => $this->faker->boolean(80),
        ];
    }
}
