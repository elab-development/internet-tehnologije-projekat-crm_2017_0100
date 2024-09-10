<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Interaction extends Model
{
    use HasFactory;

    protected $fillable = ['lead_id', 'interaction_type', 'interaction_date', 'details', 'follow_up_date'];

    public function lead()
    {
        return $this->belongsTo(Lead::class);
    }
}
