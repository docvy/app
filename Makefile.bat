@ECHO OFF

:args
IF NOT "%1"=="" (
  call :%1
  SHIFT
  GOTO args
)
GOTO :EOF

:releases
call :build
grunt


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
