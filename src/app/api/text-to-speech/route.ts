import { ElevenLabsClient } from "@elevenlabs/elevenlabs-js";
import { NextRequest, NextResponse } from "next/server";

const elevenlabs = new ElevenLabsClient({
  apiKey: process.env.ELEVENLABS_API_KEY,
});

// Default voice: Rachel (natural female voice)
const VOICE_ID = process.env.ELEVENLABS_VOICE_ID || "21m00Tcm4TlvDq8ikWAM";

export async function POST(request: NextRequest) {
  try {
    if (!process.env.ELEVENLABS_API_KEY) {
      return NextResponse.json(
        { error: "ElevenLabs API key not configured" },
        { status: 500 }
      );
    }

    const { text } = await request.json();

    if (!text || typeof text !== "string") {
      return NextResponse.json(
        { error: "Text is required" },
        { status: 400 }
      );
    }

    // Limit text length (ElevenLabs free tier has limits)
    const truncatedText = text.slice(0, 5000);

    const audioStream = await elevenlabs.textToSpeech.convert(VOICE_ID, {
      text: truncatedText,
      modelId: "eleven_multilingual_v2",
      outputFormat: "mp3_44100_128",
    });

    // Convert ReadableStream to buffer
    const reader = audioStream.getReader();
    const chunks: Uint8Array[] = [];

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      if (value) chunks.push(value);
    }

    const audioBuffer = Buffer.concat(chunks);

    return new NextResponse(audioBuffer, {
      headers: {
        "Content-Type": "audio/mpeg",
        "Content-Length": audioBuffer.length.toString(),
        "Cache-Control": "public, max-age=86400",
      },
    });
  } catch (error) {
    console.error("ElevenLabs TTS error:", error);
    return NextResponse.json(
      { error: "Failed to generate audio" },
      { status: 500 }
    );
  }
}
