import axios from 'axios';
import CryptoJS from 'crypto-js';

const PUBLIC_KEY = process.env.NEXT_PUBLIC_MARVEL_PUBLIC_KEY;
const PRIVATE_KEY = process.env.NEXT_PUBLIC_MARVEL_PRIVATE_KEY;
const BASE_URL = 'https://gateway.marvel.com:443/v1/public/';

// Criei uma função para gerar hash (API da marvel precisa de um hash)
const generateHash = (timestamp: string) => {
  return CryptoJS.MD5(timestamp + PRIVATE_KEY + PUBLIC_KEY).toString();;
};

export const fetchCharacters = async (name: any) => {
  const timestamp = new Date().getTime();
  const hash = generateHash(timestamp.toString());
  try {
    let url = `${BASE_URL}characters?ts=${timestamp}&apikey=${PUBLIC_KEY}&hash=${hash}`;
    if (name) {
      url += `&nameStartsWith=${encodeURIComponent(name)}`;
    }
    const response = await axios.get(url);
    return response.data.data.results;
  } catch (error) {
    console.error('Erro ao buscar personagens:', error);
    throw error;
  }
};

export const fetchCharacterById = async (id: any) => {
  const timestamp = new Date().getTime();
  const hash = generateHash(timestamp.toString());
  try {
    const response = await fetch(`${BASE_URL}characters/${id}?ts=${timestamp}&apikey=${PUBLIC_KEY}&hash=${hash}`);
    const data = await response.json();
    
    if (response.ok) {
      return data.data.results[0];
    } else {
      console.log(data, "erro")
    }
  } catch (error) {
    console.error("Erro ao buscar personagem:", error);
    throw error;
  }
}