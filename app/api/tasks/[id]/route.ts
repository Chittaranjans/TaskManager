import prisma from "@/app/utils/connect";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function DELETE(req: Request,
    { params }: { params: { id: string } }
) {
    try {
        const { userId } = auth();
        const { id } = params;

        if (!userId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const task = await prisma.task.delete({
            where: {
                id
            }
        });

        return NextResponse.json(task);
    }
    catch (error) {
        console.log("Error deleting tasks: ", error);
        return NextResponse.json({ error: "Error deleting tasks" }, { status: 500 })
    }
}

export async function PUT(req: Request,
    { params }: { params: { id: string } }
) {
    try {
        const { userId } = auth();
        const { id } = params;
        const { isCompleted } = await req.json();

        if (!userId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const task = await prisma.task.update({
            where: {
                id
            },
            data: {
                isCompleted
            }
        });
        console.log("Task: ", isCompleted);

        return NextResponse.json(task);
    }
    catch (error) {
        console.log("Error updating tasks: ", error);
        return NextResponse.json({ error: "Error updating tasks" }, { status: 500 })
    }
}