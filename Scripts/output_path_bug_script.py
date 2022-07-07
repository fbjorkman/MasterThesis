# Written by Fredrik Björkman 2022-02-03
# Script for solving a bug in IntelliJ that changes the output path on multiple files. 
# This script changes back the output path to the correct one
# The script needs to be located in the root directory of the IntelliJ project

import os
import re

def collect_files():
    imlfiles = []
    rootdir = os.path.dirname(os.path.realpath(__file__))

    for root, dirs, files in os.walk(rootdir):
        for file in files:
            if file.endswith(".iml"):
                imlfiles.append(os.path.join(root, file))

    return imlfiles

def rewrite(imlfiles):
    for filename in imlfiles:
        replacement = ''
        with open(filename, 'r') as file:
            for row in file.readlines():
                search = re.search(' .*<output url=', row)
                if search != None:
                    row = search.group(0) + '"file://$MODULE_DIR$/target/classes" />\n'
                
                search = re.search(' .*<output-test url=', row)
                if search != None:
                    row = search.group(0) + '"file://$MODULE_DIR$/target/test-classes" />\n'
                replacement += row
        with open(filename, 'w') as file:
            file.write(replacement)

def main():
    imlfiles = collect_files()
    rewrite(imlfiles)

main()