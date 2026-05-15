serve: verify-schema
	bundle exec jekyll serve --config _config.yml,_config-dev.yml

build: verify-schema
	bundle exec jekyll build

build-verbose: verify-schema
	bundle exec jekyll build --verbose

verify-schema: install
	python3 verify-schema.py

install:
	bundle config set --local path vendor/bundle
	bundle install

verify-site: build
	bash verify-site.sh

clean:
	bundle exec jekyll clean
