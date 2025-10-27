import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabaseclient'

// 🟢 GET – alle Einträge abrufen
export async function GET() {
  const { data, error } = await supabase
    .from('education')
    .select('*')
    .order('id', { ascending: true }) // optional, falls du Reihenfolge willst

  if (error) {
    console.error('Error fetching education:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json(data)
}

// 🟢 POST – neuen Eintrag hinzufügen
export async function POST(req: Request) {
  const body = await req.json()

  const { data, error } = await supabase
    .from('education')
    .insert([body]) // body ist ein Objekt z. B. { title: "Bachelor", school: "XYZ" }
    .select()

  if (error) {
    console.error('Error adding education:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json(data)
}

