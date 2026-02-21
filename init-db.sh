#!/bin/bash
set -e

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
    CREATE DATABASE cineh7_auth;
    CREATE DATABASE cineh7_movie_theater;
    CREATE DATABASE cineh7_booking;
EOSQL
