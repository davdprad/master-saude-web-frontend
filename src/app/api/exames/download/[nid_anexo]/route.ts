import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { backendApi } from "@/src/services-server/api";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ nid_anexo: number }> },
) {
  const jar = await cookies();
  const access = jar.get("access_token")?.value;

  if (!access) {
    return NextResponse.json({ message: "Não autenticado" }, { status: 401 });
  }

  try {
    const { nid_anexo } = await params;

    // Buscamos o arquivo como arraybuffer ou blob
    const response = await backendApi.get(`/exame/download/${nid_anexo}`, {
      headers: { Authorization: `Bearer ${access}` },
      responseType: "arraybuffer",
    });

    // Repassamos o conteúdo e o Content-Type original (pdf, png, etc)
    return new NextResponse(response.data, {
      status: 200,
      headers: {
        "Content-Type": response.headers["content-type"],
        "Content-Disposition":
          response.headers["content-disposition"] || "attachment",
      },
    });
  } catch (error: any) {
    const errorData = error.response?.data;
    let message = "Erro ao baixar arquivo";

    if (errorData instanceof ArrayBuffer || Buffer.isBuffer(errorData)) {
      try {
        const decoded = JSON.parse(new TextDecoder().decode(errorData));
        message = decoded.detail || message;
      } catch {}
    }

    return NextResponse.json(
      { message },
      { status: error.response?.status || 500 },
    );
  }
}
