/*
    ╔════════════════════════════════════════════════════════════════════════════╗
    ║                                                                           ║
    ║                AstroDesktop - Componentes Nativos en C++                 ║
    ║                                                                          ║
    ║  Este archivo es parte de AstroDesktop, implementando módulos nativos     ║
    ║  en C++ para potenciar el editor de código.                               ║
    ║                                                                          ║
    ║  Componentes a desarrollar:                                               ║
    ║    • Editor de código                                                     ║
    ║                                                                          ║
    ║  Compiladores preinstalados:                                              ║
    ║    • GCC   • Clang   • MSVC   • Python   • Rust   • D   • Go              ║
    ║    • Java  • Kotlin  • C#     • Swift    • Ruby   • PHP                   ║
    ║                                                                          ║
    ║  Nuestro lenguaje de programación                                         ║
    ║                                                                          ║
    ╚════════════════════════════════════════════════════════════════════════════╝
*/

#include <iostream>
using namespace std;

int main (double args[]){
  
struct Compiler {
    string name;
    string path;
};

Compiler compilers[] = {
    {"GCC",    "C:/Compilers/GCC/bin/gcc.exe"},
    {"Clang",  "C:/Compilers/Clang/bin/clang.exe"},
    {"MSVC",   "C:/Program Files/Microsoft Visual Studio/2022/Community/VC/Tools/MSVC/bin/cl.exe"},
    {"Python", "C:/Python/python.exe"},
    {"Java",   "C:/Program Files/Java/jdk/bin/javac.exe"},
    {"Kotlin", "C:/Kotlin/bin/kotlinc.bat"},
    {"Swift",  "C:/Swift/usr/bin/swiftc.exe"},
    {"Ruby",   "C:/Ruby/bin/ruby.exe"},
    {"PHP",    "C:/PHP/php.exe"}
};

return 0;
}