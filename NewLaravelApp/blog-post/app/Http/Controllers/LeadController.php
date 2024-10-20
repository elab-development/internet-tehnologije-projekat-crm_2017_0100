<?php

namespace App\Http\Controllers;

use App\Models\Lead;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

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

    public function getFullLeadData()
    {
        $data = DB::table('leads')
                    ->leftJoin('contacts', 'leads.id', '=', 'contacts.lead_id')
                    ->leftJoin('interactions', 'leads.id', '=', 'interactions.lead_id')
                    ->select(
                        'leads.id as lead_id',
                        'leads.name as lead_name',
                        'leads.email as lead_email',
                        'leads.phone as lead_phone',
                        'leads.company as lead_company',
                        'leads.status as lead_status',
                        'leads.source as lead_source',
                        'contacts.contact_name',
                        'contacts.contact_email',
                        'contacts.contact_phone',
                        'contacts.position',
                        'contacts.notes',
                        'interactions.interaction_type',
                        'interactions.interaction_date',
                        'interactions.details',
                        'interactions.follow_up_date'
                    )
                    ->get();

        return response()->json($data);
    }
}
