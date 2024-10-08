# syntax=docker/dockerfile:1

FROM ruby:3.2.2

# Install dependencies
RUN apt-get update -qq && apt-get install -y \
  nodejs \
  postgresql-client \
  libssl-dev \
  libreadline-dev \
  zlib1g-dev \
  build-essential \
  curl

# Install rbenv
RUN git clone https://github.com/rbenv/rbenv.git ~/.rbenv && \
  echo 'export PATH="$HOME/.rbenv/bin:$PATH"' >> ~/.bashrc && \
  echo 'eval "$(rbenv init -)"' >> ~/.bashrc && \
  git clone https://github.com/rbenv/ruby-build.git ~/.rbenv/plugins/ruby-build && \
  echo 'export PATH="$HOME/.rbenv/plugins/ruby-build/bin:$PATH"' >> ~/.bashrc

# Install the specified Ruby version using rbenv
ENV PATH="/root/.rbenv/bin:/root/.rbenv/shims:$PATH"
RUN rbenv install 3.2.2 && rbenv global 3.2.2

WORKDIR /rails

CMD ["sleep", "infinity"]
# COPY Gemfile* .
COPY Gemfile /rails/Gemfile
COPY Gemfile.lock /rails/Gemfile.lock

# RUN bundle install

# Install Gems dependencies
RUN gem install bundler && bundle install

# Precompile assets (optional, if using Rails with assets)
# RUN bundle exec rake assets:precompile

COPY . /rails
