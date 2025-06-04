import { NextResponse } from 'next/server';
import { db } from '@/app/lib/db';

// GET /api/tasks - Get all tasks
export async function GET() {
  const tasks = db.getAll();
  const response = NextResponse.json(tasks);
  
  // Add cache control headers
  response.headers.set('Cache-Control', 'no-store');
  response.headers.set('Content-Type', 'application/json');
  
  return response;
}

// POST /api/tasks - Create a new task
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, description, completed = false } = body;

    if (!title || !description) {
      return NextResponse.json(
        { error: 'Title and description are required' },
        { 
          status: 400,
          headers: {
            'Content-Type': 'application/json',
            'Cache-Control': 'no-store'
          }
        }
      );
    }

    const newTask = db.create({ title, description, completed });
    const response = NextResponse.json(newTask, { 
      status: 201,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-store'
      }
    });
    
    return response;
  } catch (error) {
    return NextResponse.json(
      { error: 'Invalid request body' },
      { 
        status: 400,
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'no-store'
        }
      }
    );
  }
}

// HEAD /api/tasks - Get headers only
export async function HEAD() {
  const tasks = db.getAll();
  const response = new NextResponse(null, {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-store',
      'X-Total-Count': tasks.length.toString()
    }
  });
  return response;
}

// OPTIONS /api/tasks - Get available methods
export async function OPTIONS() {
  const response = new NextResponse(null, { 
    status: 204,
    headers: {
      'Allow': 'GET, POST, HEAD, OPTIONS',
      'Cache-Control': 'no-store'
    }
  });
  return response;
} 