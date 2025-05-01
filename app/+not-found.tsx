import { useState } from "react";
 
 function MemberClubPage() {
 
   const [members, setMembers] = useState([
     { id: 1, name: "Alice Johnson", isPaid: true },
     { id: 2, name: "Bob Smith", isPaid: false },
     { id: 3, name: "Carol Lee", isPaid: true },
   ]);
 
   const handleAddMember = () => {
     alert("Add New Member clicked");
   };
 
   return (
     <div className="min-h-screen bg-gray-100 p-6 flex flex-col justify-between">
       {/* Top - Add New Member */}
       <div className="flex justify-end">
         <button
           onClick={handleAddMember}
           className="bg-[#F5B461] text-white font-semibold px-4 py-2 rounded hover:opacity-90"
         >
           Add New Member
         </button>
       </div>
 
       {/* Center - Members List */}
       <div className="flex flex-col items-center mt-10 space-y-4 flex-grow">
         {members.map((member) => (
           <div
             key={member.id}
             className="flex items-center space-x-4 bg-white p-4 rounded shadow w-full max-w-md justify-between"
           >
             <button
               className="text-white px-4 py-2 rounded w-1/2 text-left"
               style={{ backgroundColor: "#8A7A67" }}
             >
               {member.name}
             </button>
             <span
               className="px-3 py-1 rounded-full text-sm font-semibold"
               style={{ backgroundColor: "#E1D9B5", color: "#000" }}
             >
               {member.isPaid ? "Paid" : "Not Paid"}
             </span>
           </div>
         ))}
       </div>
 
       {/* Bottom - Navigation Buttons */}
      
     
     </div>
   );
 }
 
 export default MemberClubPage;