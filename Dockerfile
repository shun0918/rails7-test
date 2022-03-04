FROM ruby:3.1

# install nodejs(LTS)
RUN curl -fsSL https://deb.nodesource.com/setup_lts.x | bash - && apt-get install -y nodejs

# install yarn
RUN npm install --global yarn

ENV APP /app
RUN mkdir -p $APP
COPY . $APP/

WORKDIR $APP

# RUN bundle install
