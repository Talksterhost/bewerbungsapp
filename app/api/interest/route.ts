import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabaseclient'

// 🟢 GET – alle Interessen abrufen
export async function GET() {
  const { data, error } = await supabase
    .from('interests')
    .select('*')
    .order('id', { ascending: true })

  if (error) {
    console.error('Error fetching interests:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json(data)
}

// 🟢 POST – neues Interesse hinzufügen
export async function POST(req: Request) {
  const body = await req.json()

  const { data, error } = await supabase
    .from('interests')
    .insert([body])
    .select()

  if (error) {
    console.error('Error adding interest:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json(data)
}
