<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Contact extends Model
{
    use HasFactory;

    protected $fillable = ['lead_id', 'contact_name', 'contact_email', 'contact_phone', 'position', 'notes'];

    public function lead()
    {
        return $this->belongsTo(Lead::class);
    }
}
