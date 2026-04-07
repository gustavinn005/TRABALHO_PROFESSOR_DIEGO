/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef, useState } from 'react';
import QRCodeStyling from 'qr-code-styling';
import { LogIn, User, Lock, QrCode } from 'lucide-react';
import { motion } from 'motion/react';

export default function App() {
  const qrRef = useRef<HTMLDivElement>(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (!qrRef.current) return;

    const qrCode = new QRCodeStyling({
      width: 260,
      height: 260,
      type: 'svg',
      data: 'https://auth.seuservico.com/login/request/tk_485hfy3hfj92',
      dotsOptions: {
        color: '#191970',
        type: 'rounded',
      },
      backgroundOptions: {
        color: '#ffffff',
      },
      cornersSquareOptions: {
        color: '#000000',
        type: 'extra-rounded',
      },
      cornersDotOptions: {
        type: 'dot',
      },
    });

    qrRef.current.innerHTML = '';
    qrCode.append(qrRef.current);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Login attempt:', { username, password });
    // Handle login logic here
  };

  return (
    <div className="min-h-screen bg-[#f4f6f9] flex items-center justify-center p-4 font-sans">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-[20px] shadow-[0_15px_35px_rgba(0,0,0,0.1)] w-full max-w-[850px] flex flex-col md:flex-row overflow-hidden"
      >
        {/* Login Section */}
        <div className="flex-1 p-8 md:p-12 flex flex-col justify-center border-b md:border-b-0 md:border-r border-[#eee]">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-[#1a1a1a] mb-2 flex items-center gap-2">
              <LogIn className="w-8 h-8 text-[#191970]" />
              Bem-vindo
            </h2>
            <p className="text-[#666]">Acesse sua conta ou use o QR Code ao lado.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="username" className="block text-sm font-semibold text-[#555] flex items-center gap-2">
                <User className="w-4 h-4" />
                Usuário ou E-mail
              </label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="seu.usuario@email.com"
                required
                className="w-full px-4 py-3.5 border-2 border-[#e1e5eb] rounded-xl text-base transition-all focus:outline-none focus:border-[#191970] hover:border-[#d1d5db]"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="block text-sm font-semibold text-[#555] flex items-center gap-2">
                <Lock className="w-4 h-4" />
                Senha
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full px-4 py-3.5 border-2 border-[#e1e5eb] rounded-xl text-base transition-all focus:outline-none focus:border-[#191970] hover:border-[#d1d5db]"
              />
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-[#191970] text-white rounded-xl text-base font-bold cursor-pointer transition-all hover:bg-[#12125a] active:scale-[0.98] shadow-lg shadow-[#191970]/20"
            >
              Entrar com Credenciais
            </button>
          </form>

          <div className="mt-8 text-center">
            <a href="#" className="text-sm text-[#191970] hover:underline font-medium">
              Esqueceu a senha?
            </a>
          </div>
        </div>

        {/* QR Code Section */}
        <div className="flex-1 p-8 md:p-12 flex flex-col justify-center items-center bg-[#fafbfe]">
          <motion.div 
            whileHover={{ scale: 1.02 }}
            className="bg-white p-4 rounded-2xl shadow-sm border border-[#eee] mb-6"
          >
            <div ref={qrRef} id="qr-code-container" className="flex items-center justify-center" />
          </motion.div>

          <div className="text-center space-y-3">
            <div className="flex items-center justify-center gap-2 text-[#1a1a1a] font-bold">
              <QrCode className="w-5 h-5" />
              <span>Login por Aproximação</span>
            </div>
            <p className="text-[#555] text-sm leading-relaxed max-w-[280px]">
              Abra o app de autenticação no seu celular e escaneie o código acima para acessar instantaneamente.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
