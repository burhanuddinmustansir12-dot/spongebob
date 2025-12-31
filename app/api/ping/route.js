import { NextResponse } from 'next/server';
import { exec } from 'child_process';

export async function GET() {
  return new Promise((resolve) => {
    exec("ping google.com", (error, stdout, stderr) => {
      if (error) {
        resolve(NextResponse.json({ 
          success: false, 
          error: error.message 
        }, { status: 500 }));
        return;
      }
      if (stderr) {
        resolve(NextResponse.json({ 
          success: false, 
          error: stderr 
        }, { status: 500 }));
        return;
      }
      resolve(NextResponse.json({ 
        success: true, 
        result: stdout 
      }));
    });
  });
}
