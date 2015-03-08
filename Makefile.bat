REM This batch script is an effort at porting the Unix Makefile for Windows. Therefore, it may not be updated as frequent as the Unix Makefile. (Please consider helping us keeping it up to date)

@ECHO OFF

:args
IF NOT "%1"=="" (
  call :%1
  SHIFT
  GOTO args
)
GOTO :EOF

:releases
call :pre_build
call :build
grunt


:pre_build
mkdir build


:build
cp -R src/* build
call :build_server
call :build_viewer
cd build
npm install
cd ..


:build_server
npm install GochoMugo/docvy-server#develop
mv node_modules/docvy-server build/server


:build_viewer
npm install GochoMugo/docvy-viewer#develop
mv node_modules/docvy-viewer build/viewer


:src
call :src_viewer
call :src_server


:src_viewer
mklink src\viewer ..\..\docvy-viewer\dist


:src_server
mklink /d src\server ..\..\docvy-server
