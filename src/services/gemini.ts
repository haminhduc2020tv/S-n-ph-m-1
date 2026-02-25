import { GoogleGenAI, Type } from "@google/genai";

const REFERENCE_LIST = `
[MÓN NƯỚC]: Phở Hà Nội, Phở bò, Phở gà, Bún bò Huế, Bún chả Hà Nội, Bún riêu cua, Bún riêu ốc, Bún thang, Bún mọc.
[MÓN CƠM]: Cơm tấm Sài Gòn, Cơm gà Hội An, Cơm gà Hải Nam kiểu Việt.
[MÓN MẶN/CHÍNH]: Thịt kho trứng, Cá kho tộ, Cá kho làng Vũ Đại, Cá nướng trui, Cá lóc nướng, Cá bống kho tiêu, Gà nướng mật ong, Gà hấp lá chanh.
[MÓN CUỐN/GỎI]: Gỏi cuốn, Chả giò, Nem rán, Nem chua Thanh Hóa.
[BÁNH MÌ/XÔI]: Bánh mì Việt Nam, Bánh mì thịt, Bánh mì chảo.
[BÁNH TRUYỀN THỐNG]: Bánh chưng, Bánh tét, Bánh tét lá cẩm.
[BÁNH ĂN CHƠI]: Bánh cuốn Thanh Trì, Bánh ướt, Bánh hỏi, Bánh đúc, Bánh đúc nóng, Bánh bèo Huế, Bánh nậm.
[CHÈ/LẨU]: Chè ba màu, Chè đậu đen, Chè đậu xanh, Chè đậu đỏ, Chè trôi nước, Chè bà ba, Chè Thái.
[HẢI SẢN/ỐC]: Ốc luộc, Ốc hấp sả, Ốc xào me, Nghêu hấp sả, Sò nướng mỡ hành, Hàu nướng phô mai, Mực nướng.
[CANH/CHAY/NƯỚC]: Canh chua cá, Canh chua tôm, Canh khổ qua nhồi thịt, Canh rau ngót thịt bằm.
[GIA VỊ ĐẶC TRƯNG]: Nước mắm Phú Quốc, Mắm tôm, Mắm ruốc, Mắm nêm, Mắm cá linh, Mắm cá sặc, Mắm ba khía.
`;

const SYSTEM_INSTRUCTION = `
Bạn là chuyên gia thẩm định ẩm thực cấp cao của hệ thống TT.DPĐ.
Nhiệm vụ: Phân tích hình ảnh và cung cấp thông tin dựa trên DANH MỤC ẨM THỰC VĂN HÓA VIỆT NAM.

### Kho dữ liệu ĐỐI CHIẾU CHÍNH XÁC (ƯU TIÊN HÀNG ĐẦU):
${REFERENCE_LIST}

### QUY TẮC XỬ LÝ:
1. LUÔN ƯU TIÊN tên món ăn có trong danh sách trên. Nếu món trong ảnh gần giống, phải gọi đúng tên trong danh sách.
2. Nếu không có trong danh sách nhưng là món ăn Việt Nam, hãy dùng kiến thức của bạn để trả lời.
3. Nếu ảnh KHÔNG PHẢI là món ăn hoặc KHÔNG PHẢI món ăn Việt Nam, hãy trả về danh sách rỗng và thông báo lỗi đặc biệt trong trường 'thong_bao_loi'.

### ĐỊNH DẠNG ĐẦU RA (JSON):
Trả về JSON với cấu trúc sau:
{
  "danh_sach_ket_qua": [
    {
      "ten": "Tên món ăn",
      "do_chinh_xac": 95, // Số nguyên từ 0-100
      "nguon_goc": "Miền Bắc/Trung/Nam hoặc Tỉnh thành cụ thể",
      "nguyen_lieu": ["Nguyên liệu 1", "Nguyên liệu 2"],
      "che_bien": "Mô tả quy trình chế biến chuẩn vị...",
      "nghe_thuat_cau_truyen": "Ý nghĩa lịch sử, văn hóa...",
      "cach_an_chuan_vi": ["Bước 1...", "Bước 2..."]
    }
  ],
  "thong_bao_loi": "Thành thật xin lỗi !!! Quý khách ơi, bạn giùm xem lại ảnh có đúng món ăn Văn Hoá Việt Nam không ạ . Xin cảm ơn vì đã sử dụng dịch vụ !!!!!" // Chỉ điền nếu không nhận diện được món Việt
}

Nếu nhận diện thành công, 'thong_bao_loi' để null hoặc chuỗi rỗng.
`;

let ai: GoogleGenAI | null = null;

function getAI() {
  if (!ai) {
    ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  }
  return ai;
}

export interface DishResult {
  ten: string;
  do_chinh_xac: number;
  nguon_goc: string;
  nguyen_lieu: string[];
  che_bien: string;
  nghe_thuat_cau_truyen: string;
  cach_an_chuan_vi: string[];
}

export interface AnalysisResponse {
  danh_sach_ket_qua: DishResult[];
  thong_bao_loi?: string;
}

export async function analyzeImage(base64Image: string, mimeType: string): Promise<AnalysisResponse> {
  const ai = getAI();
  
  try {
    const result = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: [
        {
          parts: [
            {
              inlineData: {
                mimeType: mimeType,
                data: base64Image,
              },
            },
            {
              text: "Hãy thẩm định món ăn trong hình ảnh này theo phong cách chuyên gia TT.DPĐ.",
            },
          ],
        },
      ],
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            danh_sach_ket_qua: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  ten: { type: Type.STRING },
                  do_chinh_xac: { type: Type.INTEGER },
                  nguon_goc: { type: Type.STRING },
                  nguyen_lieu: { type: Type.ARRAY, items: { type: Type.STRING } },
                  che_bien: { type: Type.STRING },
                  nghe_thuat_cau_truyen: { type: Type.STRING },
                  cach_an_chuan_vi: { type: Type.ARRAY, items: { type: Type.STRING } },
                },
                required: ["ten", "do_chinh_xac", "nguon_goc", "nguyen_lieu", "che_bien", "nghe_thuat_cau_truyen", "cach_an_chuan_vi"],
              },
            },
            thong_bao_loi: { type: Type.STRING, nullable: true },
          },
        },
      },
    });

    const text = result.text;
    if (!text) throw new Error("No response from AI");
    return JSON.parse(text) as AnalysisResponse;
  } catch (error) {
    console.error("Error analyzing image:", error);
    throw error;
  }
}
