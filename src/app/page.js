import Navbar from "./components/Navbar";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <Navbar></Navbar>
      
      <div className="grid grid-cols-2 mx-10 items-center mt-16 overflow-hidden">
        <div className="flex flex-col gap-4">
          <h1 className=" text-6xl">ยินดีต้อนรับ</h1>
          <p className=" text-3xl">
            GoGroup เป็นเว็บไซต์แชร์ค่ารถสำหรับลูกค้า
            ที่ต้องการเดินทางไปยังจุดหมายเดียวกัน ประหยัด สะดวก ใช้งานง่าย
            ปลอดภัย และ คุ้มค่า
          </p>
          <Link href="/location2">
          <button className=" w-36 p-4 rounded-xl text-white bg-[#2F2694] mx-auto mt-10">ค้นหารถ</button>
          </Link>
        </div>

        <div>
          <img src="/images/group.jpg" className=" rounded-3xl"></img>
        </div>
      </div>
    </div>
  );
}
