<?php

namespace App\Http\Controllers;

use App\Models\Contact;
use Illuminate\Http\Request;

class ContactController extends Controller
{
    public function index()
    {
        return response()->json(Contact::all());
    }

    public function store(Request $request)
    {
        $request->validate([
            'lead_id' => 'required|exists:leads,id',
            'contact_name' => 'required|string',
            'contact_email' => 'nullable|string|email',
            'contact_phone' => 'nullable|string',
            'position' => 'nullable|string',
            'notes' => 'nullable|string',
        ]);

        $contact = Contact::create($request->all());
        return response()->json($contact, 201);
    }

    public function show($id)
    {
        $contact = Contact::find($id);
        if (!$contact) {
            return response()->json(['message' => 'Contact not found'], 404);
        }
        return response()->json($contact);
    }

    public function update(Request $request, $id)
    {
        $contact = Contact::find($id);
        if (!$contact) {
            return response()->json(['message' => 'Contact not found'], 404);
        }

        $request->validate([
            'lead_id' => 'sometimes|required|exists:leads,id',
            'contact_name' => 'sometimes|required|string',
            'contact_email' => 'nullable|string|email',
            'contact_phone' => 'nullable|string',
            'position' => 'nullable|string',
            'notes' => 'nullable|string',
        ]);

        $contact->update($request->all());
        return response()->json($contact);
    }

    public function destroy($id)
    {
        $contact = Contact::find($id);
        if (!$contact) {
            return response()->json(['message' => 'Contact not found'], 404);
        }
        
        $contact->delete();
        return response()->json(null, 204);
    }
}
