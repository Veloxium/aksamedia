
function ZBackground() {
  return (
    <div className="absolute inset-0 -z-10 h-full w-screen overflow-hidden">
      <div className="w-full h-full">
        <div className="absolute top-[-10%] left-[-10%] w-[400px] h-[400px] bg-gradient-to-tr from-pink-400 via-yellow-300 to-blue-400 opacity-60 blur-3xl animate-bg-move1" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[350px] h-[350px] bg-gradient-to-br from-green-300 via-purple-400 to-pink-400 opacity-50 blur-2xl animate-bg-move2" />
        <div className="absolute top-[30%] left-[60%] w-[300px] h-[300px] bg-gradient-to-tl from-blue-300 via-cyan-400 to-indigo-400 opacity-40 blur-2xl animate-bg-move3" />
        <div className="absolute top-[60%] left-[10%] w-[250px] h-[250px] bg-gradient-to-br from-yellow-200 via-pink-300 to-red-400 opacity-30 blur-2xl animate-bg-move4" />
        <div className="absolute bottom-[20%] right-[30%] w-[200px] h-[200px] bg-gradient-to-tr from-green-200 via-blue-300 to-purple-300 opacity-25 blur-xl animate-bg-move5" />
        <div className="absolute top-[10%] right-[15%] w-[180px] h-[180px] bg-gradient-to-bl from-orange-300 via-yellow-200 to-pink-200 opacity-20 blur-xl animate-bg-move6" />
        <div className="absolute bottom-[15%] left-[20%] w-[160px] h-[160px] bg-gradient-to-t from-teal-200 via-green-300 to-blue-200 opacity-15 blur-lg animate-bg-move7" />
        <div className="absolute top-[50%] right-[40%] w-[140px] h-[140px] bg-gradient-to-br from-purple-200 via-pink-200 to-yellow-100 opacity-10 blur-lg animate-bg-move8" />
      </div>
    </div>
  );
}

export default ZBackground