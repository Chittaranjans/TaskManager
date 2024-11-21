import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import prisma from "@/app/utils/connect";

export async function POST(req: Request) {
    try {
        const { userId } = auth();
        if (!userId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { title, description, date, completed, important } = await req.json();

        if (!title || !description || !date) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        if (title.length < 3) {
            return NextResponse.json({ error: "Title must be at least 3 characters" }, { status: 400 });
        }

        const task = await prisma.task.create({
            data: {
                title,
                description,
                date,
                isCompleted: completed,
                isImportant: important,
                userId
            },
        });

        return NextResponse.json(task);
    }
    catch (error) {
        console.log("Error creating tasks: ", error);
        return NextResponse.json({ error: "Error creating tasks" }, { status: 500 })
    }
}

export async function GET(req: Request) {
    try {
        const { userId } = auth()

        if (!userId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const tasks = await prisma.task.findMany({
            where: {
                userId
            }
        });

        console.log("Tasks: ", tasks);
        return NextResponse.json(tasks);
    }
    catch (error) {
        console.log("Error fetching tasks: ", error);
        return NextResponse.json({ error: "Error fetching tasks" }, { status: 500 })
    }
}

export async function PUT(req: Request) {
    try {

    }
    catch (error) {
        console.log("Error updating tasks: ", error);
        return NextResponse.json({ error: "Error updating tasks" }, { status: 500 })
    }
}

export async function DELETE(req: Request) {
    try {

    }
    catch (error) {
        console.log("Error deleting tasks: ", error);
        return NextResponse.json({ error: "Error deleting tasks" }, { status: 500 })
    }
}

