<?php

namespace App\Http\Controllers;

use App\Models\Lead;
use Illuminate\Http\Request;

class LeadController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return response()->json(Lead::all());
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string',
            'email' => 'nullable|string|email',
            'phone' => 'nullable|string',
            'company' => 'nullable|string',
            'status' => 'nullable|in:new,contacted,qualified,closed',
            'source' => 'nullable|string',
        ]);

        $lead = Lead::create($request->all());
        return response()->json($lead, 201);
    }

    public function show($id)
    {
        $lead = Lead::find($id);
        if (!$lead) {
            return response()->json(['message' => 'Lead not found'], 404);
        }
        return response()->json($lead);
    }

    public function update(Request $request, $id)
    {
        $lead = Lead::find($id);
        if (!$lead) {
            return response()->json(['message' => 'Lead not found'], 404);
        }

        $request->validate([
            'name' => 'sometimes|required|string',
            'email' => 'nullable|string|email',
            'phone' => 'nullable|string',
            'company' => 'nullable|string',
            'status' => 'nullable|in:new,contacted,qualified,closed',
            'source' => 'nullable|string',
        ]);

        $lead->update($request->all());
        return response()->json($lead);
    }

    public function destroy($id)
    {
        $lead = Lead::find($id);
        if (!$lead) {
            return response()->json(['message' => 'Lead not found'], 404);
        }
        
        $lead->delete();
        return response()->json(null, 204);
    }
}
