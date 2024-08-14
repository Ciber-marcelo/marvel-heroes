import axios from 'axios';
import CryptoJS from 'crypto-js';

const PUBLIC_KEY = process.env.NEXT_PUBLIC_MARVEL_PUBLIC_KEY;
const PRIVATE_KEY = process.env.NEXT_PUBLIC_MARVEL_PRIVATE_KEY;
const BASE_URL = 'http://gateway.marvel.com/v1/public/';

// Criei uma função para gerar hash (API da marvel precisa de um hash)
const generateHash = (timestamp: string) => {
  return CryptoJS.MD5(timestamp + PRIVATE_KEY + PUBLIC_KEY).toString();;
};

export const fetchCharacters = async (name: string) => {
  const timestamp = new Date().getTime();
  const hash = generateHash(timestamp.toString());
  try {
    const response = await axios.get(`${BASE_URL}characters`, {
      params: {
        apikey: PUBLIC_KEY,
        ts: timestamp,
        hash: hash,
        nameStartsWith: name,
      },
    });
    console.log(response.data.data.results)
    return response.data.data.results;
  } catch (error) {
    console.error('Erro ao buscar personagens:', error);
    throw error;
  }
};