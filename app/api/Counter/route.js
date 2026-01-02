import { NextResponse } from "next/server";

export async function POST(request){
    try {
    const body = await request.json();
    
    const {action, counterId} = body;

    console.log(
        `${
            action === "increment" ? "🤩" : "😢"
        } Counter ${counterId} ${action}ed`
    );
    // -do anything here//
    // -Save info in DataBase
    // - Compute date
    // - Call another Api etc

    return NextResponse.json({
        success: true,
        data: { action, counterId },
    });
} catch (error) {
    return NextResponse.json(
        { success: false, error: error.message },
        { status: 500 }
    );
}
}
