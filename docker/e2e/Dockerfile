FROM mcr.microsoft.com/playwright:v1.54.0

RUN mkdir /app
WORKDIR /app
COPY ./e2e/ /app/

RUN npm install --force
RUN npx playwright install

CMD ["tail", "-f", "dev/null"]