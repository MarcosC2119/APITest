import { NextResponse } from 'next/server';
import { db } from '@/app/lib/db';

const createResponse = (data: any, status: number = 200) => {
  return NextResponse.json(data, {
    status,
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-store'
    }
  });
};

// GET /api/tasks/[id] - Get a specific task
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = parseInt(params.id);
  const task = db.getById(id);

  if (!task) {
    return createResponse({ error: 'Task not found' }, 404);
  }

  return createResponse(task);
}

// PUT /api/tasks/[id] - Replace a task completely
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);
    const body = await request.json();
    const { title, description, completed } = body;

    if (!title || !description) {
      return createResponse(
        { error: 'Title and description are required' },
        400
      );
    }

    const updatedTask = db.update(id, { title, description, completed });
    if (!updatedTask) {
      return createResponse({ error: 'Task not found' }, 404);
    }

    return createResponse(updatedTask);
  } catch (error) {
    return createResponse({ error: 'Invalid request body' }, 400);
  }
}

// PATCH /api/tasks/[id] - Update a task partially
export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);
    const body = await request.json();
    const updatedTask = db.update(id, body);

    if (!updatedTask) {
      return createResponse({ error: 'Task not found' }, 404);
    }

    return createResponse(updatedTask);
  } catch (error) {
    return createResponse({ error: 'Invalid request body' }, 400);
  }
}

// DELETE /api/tasks/[id] - Delete a task
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = parseInt(params.id);
  const success = db.delete(id);

  if (!success) {
    return createResponse({ error: 'Task not found' }, 404);
  }

  return new NextResponse(null, { 
    status: 204,
    headers: {
      'Cache-Control': 'no-store'
    }
  });
}

// OPTIONS /api/tasks/[id] - Get available methods for a specific task
export async function OPTIONS() {
  return new NextResponse(null, { 
    status: 204,
    headers: {
      'Allow': 'GET, PUT, PATCH, DELETE, OPTIONS',
      'Cache-Control': 'no-store'
    }
  });
} 