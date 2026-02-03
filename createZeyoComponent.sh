#!/bin/bash

# Check if the correct number of arguments is provided
if [ "$#" -ne 5 ]; then
    echo "Usage: $0 create class <ClassName> type <Type>"
    exit 1
fi

# Extract the class name and type from the arguments
CLASS_NAME=$3
TYPE=$5

# Create the TypeScript file content
CONTENT="
import { ZeyoAs } from \"zeyo\"

export default class $CLASS_NAME extends ZeyoAs<\"$TYPE\"> {
  app: App

  constructor(app: App) {
    super(\"$TYPE\")
    this.app = app
  }
}
"

# Write the content to a .ts file
echo "$CONTENT" > "$CLASS_NAME.ts"

echo "File $CLASS_NAME.ts created successfully."