<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $this->call('TeachersTableSeeder');
        $this->call('LessonDurationTableSeeder');
        $this->call('TeacherExperienceTableSeeder');
        $this->call('TeachingLevelTableSeeder');
        $this->call('TeacherLevelTableSeeder');
    }
}
