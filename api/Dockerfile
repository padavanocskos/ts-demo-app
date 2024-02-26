# syntax = docker/dockerfile:1

FROM ruby:3.2.2
WORKDIR /rails
COPY Gemfile* .
RUN bundle install
COPY . .
