#!/usr/bin/env python3
import yaml
from jinja2 import Environment, FileSystemLoader
import os
import sys
from datetime import datetime


def load_config():
    with open('content/config.yml', 'r', encoding='utf-8') as f:
        return yaml.safe_load(f)


def generate_html(config):
    # Set up Jinja2 environment
    env = Environment(
        loader=FileSystemLoader('templates'),
        trim_blocks=True,
        lstrip_blocks=True
    )

    # Load the template
    template = env.get_template('index.html.j2')

    # Add build timestamp
    config['build_timestamp'] = datetime.utcnow().strftime(
        '%Y-%m-%d %H:%M:%S UTC')

    # Render the template with our config
    html = template.render(**config)

    # Write the output
    with open('index.html', 'w', encoding='utf-8') as f:
        f.write(html)


def main():
    try:
        # Ensure required directories exist
        if not os.path.exists('content/config.yml'):
            print("Error: content/config.yml not found!")
            sys.exit(1)
        if not os.path.exists('templates'):
            print("Error: templates directory not found!")
            sys.exit(1)

        # Load and generate
        config = load_config()
        generate_html(config)
        print("Successfully generated index.html")

    except Exception as e:
        print(f"Error generating HTML: {str(e)}")
        sys.exit(1)


if __name__ == '__main__':
    main()
