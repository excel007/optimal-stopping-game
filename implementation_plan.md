# แผนการพัฒนาเกมสอนเรื่อง Optimal Stopping (The Secretary Problem)

## 1. แนวคิดของเกม (Game Concept)
*   **ชื่อเกม**: "The Best Choice" (ทางเลือกที่ดีที่สุด) หรือ "Diamond Hunter"
*   **เป้าหมาย**: ผู้เล่นต้องเลือก "เพชร" ที่มีมูลค่าสูงสุดจากกองเพชรที่มีจำนวนจำกัด (N ชิ้น)
*   **กติกา (Rules)**:
    1.  ระบบจะสุ่มลำดับมูลค่าของเพชร N ชิ้น (ผู้เล่นไม่รู้มูลค่าล่วงหน้า)
    2.  เพชรจะถูกเปิดให้ดูทีละเม็ด
    3.  เมื่อดูแล้ว ผู้เล่นต้องตัดสินใจทันทีว่าจะ **"เลือก" (Pick)** หรือ **"ผ่าน" (Pass)**
    4.  ถ้า **"ผ่าน"** จะย้อนกลับมาเลือกเม็ดเดิมไม่ได้
    5.  ถ้า **"เลือก"** เกมจะจบทันที และสรุปผลว่าได้เพชรที่ดีที่สุดหรือไม่
    6.  ถ้าผ่านจนถึงเม็ดสุดท้าย จำเป็นต้องเลือกเม็ดนั้น

## 2. การออกแบบเพื่อการเรียนรู้ (Educational Design)
เกมจะแบ่งเป็นโหมดต่างๆ เพื่อค่อยๆ สอนผู้เล่น:

*   **Mode 1: Intuition (สัญชาตญาณ)**
    *   ให้ผู้เล่นลองเล่นเองโดยไม่มีตัวช่วย (N=10)
    *   เป้าหมาย: ให้ผู้เล่นตระหนักถึงความยากในการตัดสินใจเมื่อไม่มีข้อมูล
*   **Mode 2: The Analysis (วิเคราะห์)**
    *   หลังจบเกม แสดงกราฟให้เห็นว่าเพชรเม็ดที่ดีที่สุดอยู่ที่ลำดับที่เท่าไหร่บ่อยที่สุด
*   **Mode 3: The Algorithm (37% Rule)**
    *   สอนกลยุทธ์ **Look-Then-Leap**:
        1.  **Look**: สังเกตการณ์ในช่วง 37% แรก (เช่น ถ้ามี 100 ชิ้น ให้ดู 37 ชิ้นแรกแล้วผ่านหมด) เพื่อหาค่ามาตรฐาน (Benchmark)
        2.  **Leap**: หลังจากนั้น เลือกชิ้นแรกที่มีค่า *สูงกว่า* ค่าสูงสุดที่เคยเห็นในช่วง Look
    *   มีปุ่ม "Auto Play" ให้ AI เล่นให้ดูโดยใช้สูตรนี้

## 3. Tech Stack & Design
*   **Core**: HTML5, JavaScript (ES6+)
*   **Build Tool**: Vite (เพื่อความสะดวกในการจัดการ Project และ Hot Reload)
*   **Styling**: Vanilla CSS
    *   **Theme**: Premium Dark Mode, Glassmorphism (กระจกฝ้า), Neon Accents
    *   **Animations**: Card flipping, Smooth transitions, Particle effects เมื่อชนะ
*   **Deployment**: Static Hosting

## 4. ขั้นตอนการพัฒนา (Development Roadmap)

### Phase 1: Foundation
- [ ] Setup Vite Project
- [ ] สร้างไฟล์ HTML/CSS พื้นฐาน
- [ ] Implement Game Logic Class (Generate sequence, Next item, Check win)

### Phase 2: Core Gameplay UI
- [ ] สร้างหน้าจอแสดงการ์ด (Card View)
- [ ] ปุ่มควบคุม (Pick / Pass)
- [ ] หน้าจอสรุปผล (Result Screen: คุณเลือกได้อันดับที่เท่าไหร่)

### Phase 3: Educational Features
- [ ] เพิ่ม Visual Indicator บอกว่าตอนนี้อยู่ที่ลำดับที่เท่าไหร่
- [ ] เพิ่มโหมด "Algorithm Assistant" แนะนำว่าควรเลือกหรือควรผ่าน

### Phase 4: Polish
- [ ] ปรับแต่ง CSS ให้สวยงาม (Responsive, Hover effects)
- [ ] เพิ่ม Sound Effects
