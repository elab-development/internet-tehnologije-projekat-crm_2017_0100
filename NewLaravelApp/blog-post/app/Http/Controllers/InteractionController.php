<?php

namespace App\Http\Controllers;

use App\Models\Interaction;
use Illuminate\Http\Request;

class InteractionController extends Controller
{
    public function index()
    {
        return response()->json(Interaction::all());
    }

    public function store(Request $request)
    {
        $request->validate([
            'lead_id' => 'required|exists:leads,id',
            'interaction_type' => 'required|in:call,email,meeting',
            'interaction_date' => 'required|date',
            'details' => 'nullable|string',
            'follow_up_date' => 'nullable|date',
        ]);

        $interaction = Interaction::create($request->all());
        return response()->json($interaction, 201);
    }

    public function show($id)
    {
        $interaction = Interaction::find($id);
        if (!$interaction) {
            return response()->json(['message' => 'Interaction not found'], 404);
        }
        return response()->json($interaction);
    }

    public function update(Request $request, $id)
    {
        $interaction = Interaction::find($id);
        if (!$interaction) {
            return response()->json(['message' => 'Interaction not found'], 404);
        }

        $request->validate([
            'lead_id' => 'sometimes|required|exists:leads,id',
            'interaction_type' => 'sometimes|required|in:call,email,meeting',
            'interaction_date' => 'sometimes|required|date',
            'details' => 'nullable|string',
            'follow_up_date' => 'nullable|date',
        ]);

        $interaction->update($request->all());
        return response()->json($interaction);
    }

    public function destroy($id)
    {
        $interaction = Interaction::find($id);
        if (!$interaction) {
            return response()->json(['message' => 'Interaction not found'], 404);
        }
        
        $interaction->delete();
        return response()->json(null, 204);
    }
}
