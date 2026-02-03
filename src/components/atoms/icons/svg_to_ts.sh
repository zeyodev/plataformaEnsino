#!/bin/bash

# Directory containing SVG files. Defaults to the current directory.
SVG_DIR="${1:-.}"

# Output directory for TypeScript files. Defaults to 'icons' subdirectory.
TS_DIR="${2:-./icons}"

# Create the output directory if it doesn't exist
mkdir -p "$TS_DIR"

# Check if there are any SVG files in the directory
if ! ls "$SVG_DIR"/*.svg &> /dev/null; then
  echo "No SVG files found in '$SVG_DIR'."
  exit 1
fi

echo "Processing SVG files from '$SVG_DIR' and creating TypeScript files in '$TS_DIR'..."

# Loop through all .svg files in the specified directory
for svg_file in "$SVG_DIR"/*.svg; do
  if [ -f "$svg_file" ]; then
    echo "Processing '$svg_file'..."

    # Read the SVG content
    svg_content=$(cat "$svg_file")

    # Extract the class attribute value
    # Using grep with Perl-compatible regular expressions (PCRE) for lookarounds
    class_attr=$(echo "$svg_content" | grep -oP 'class="\K[^"]*')

    if [ -z "$class_attr" ]; then
      echo "  WARNING: No class attribute found in '$svg_file'. Skipping."
      continue
    fi

    # Remove "feather feather-" prefix (adjust if your prefix is different or has variations)
    base_name_kebab=$(echo "$class_attr" | sed 's/feather feather-//g')

    if [ -z "$base_name_kebab" ]; then
      echo "  WARNING: Class attribute '$class_attr' in '$svg_file' does not conform to expected 'feather feather-name' format after stripping. Skipping."
      continue
    fi

    # Convert kebab-case to CamelCase and prefix with "icon"
    # Example: "zoom-in" -> "ZoomIn"
    camel_case_name=$(echo "$base_name_kebab" | awk -F'-' '{for(i=1;i<=NF;i++) $i=toupper(substr($i,1,1)) substr($i,2); print}' OFS='')
    ts_file_name="icon${camel_case_name}.ts"

    # Create the TypeScript file content
    # Ensure that backticks and dollar signs within svg_content are escaped if they cause issues.
    # For most valid SVG, this direct embedding should work.
    # If you have dynamic content or backticks inside your SVG attributes/text, you might need more robust escaping.
    ts_content=$(cat <<EOF
import { I } from "zeyo"; // Assuming "zeyo" is a valid import path

export default () => (new class extends I { }).HTML(\`$svg_content\`);
EOF
)

    # Write to the TypeScript file
    echo "$ts_content" > "$TS_DIR/$ts_file_name"
    echo "  Successfully created '$TS_DIR/$ts_file_name'"
  fi
done

echo "Finished processing all SVG files."