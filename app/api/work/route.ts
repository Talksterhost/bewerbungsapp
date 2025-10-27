import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabaseclient'

// 🟢 GET – alle Arbeitseinträge abrufen
export async function GET() {
  const { data, error } = await supabase
    .from('work') // Tabellenname in Supabase
    .select('*')
    .order('id', { ascending: true })

  if (error) {
    console.error('Error fetching work:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json(data)
}

// 🟢 POST – neuen Eintrag hinzufügen
export async function POST(req: Request) {
  const body = await req.json()

  const { data, error } = await supabase
    .from('work')
    .insert([body])
    .select()

  if (error) {
    console.error('Error adding work:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json(data)
}
