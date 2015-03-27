#!/usr/bin/env python

'''
CI Server release script

The MIT License (MIT)
Copyright (c) 2015 GochoMugo <mugo@forfuture.co.ke>
'''


import dropbox
import os
import json


class Build:
  def __init__(self, key, version_no, source_dir, platforms):
    self.__key = key
    self.__client = dropbox.client.DropboxClient(key)
    self.__metadata_path = "/docvy-app/package.json"
    try:
      data = self.__client.get_file(self.__metadata_path).read()
      self.__metadata = json.loads(data)
    except:
      self.__metadata = { "build_no": 1 }
    self.__build_no = self.__metadata["build_no"]
    self.__version_no = version_no
    self.__source_dir = source_dir
    self.__platforms = platforms

  def paths(self):
    paths = {}
    name = "docvy-app-v" + self.__version_no + ".nw"
    for platform in self.__platforms:
      src = os.path.join(self.__source_dir, platform, "docvy-app", name)
      dest = os.path.join("/docvy-app", str(self.__build_no), name)
      paths[src] = dest
    return paths

  def __push_packages(self):
    paths = self.paths()
    for src in paths:
      pkg = open(src)
      self.__client.put_file(paths[src], pkg)

  def __push_metadata(self):
    metadata = {}
    metadata["build_no"] = self.__build_no + 1
    self.__client.put_file(self.__metadata_path,
      json.dumps(metadata), overwrite=True)

  def push(self):
    self.__push_packages()
    self.__push_metadata()


pkg_data = json.loads(open("src/package.json").read())
project_data = json.loads(open("package.json").read())
new_build = Build(
  key=os.environ["DBOX_KEY"],
  version_no=pkg_data["version"],
  source_dir="releases/docvy-app - v" + pkg_data["version"],
  platforms=project_data["platforms"])
new_build.push()
