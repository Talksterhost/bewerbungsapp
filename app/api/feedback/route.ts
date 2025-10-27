import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabaseclient'

// 🟢 GET – alle Feedback-Einträge abrufen
export async function GET() {
  const { data, error } = await supabase
    .from('feedback')
    .select('*')
    .order('id', { ascending: true })

  if (error) {
    console.error('Error fetching feedback:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json(data)
}

// 🟢 POST – neues Feedback hinzufügen
export async function POST(req: Request) {
  const body = await req.json()

  const { data, error } = await supabase
    .from('feedback')
    .insert([body])
    .select()

  if (error) {
    console.error('Error adding feedback:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json(data)
}

