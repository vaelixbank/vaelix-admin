import React, { useState } from "react";

interface LoginResponse {
  success: boolean;
  message?: string;
  token?: string;
}

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccessMessage(null);

    try {
      const response = await fetch("/api/v1/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, rememberMe }),
      });

      const data: LoginResponse = await response.json();

      if (response.ok && data.success) {
        setSuccessMessage("Connexion réussie !");
        if (data.token) {
          localStorage.setItem("authToken", data.token);
        }
        // Redirection ou autre logique ici
      } else {
        setError(data.message || "Erreur lors de la connexion.");
      }
    } catch (err) {
      setError("Impossible de se connecter au serveur.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center">
          <div className="text-blue-600 font-bold text-2xl tracking-wide select-none">
            NeoBank
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="flex flex-grow">
        {/* Left side - illustration */}
        <section className="hidden md:flex w-1/2 bg-gradient-to-tr from-blue-700 to-blue-400 text-white items-center justify-center p-10">
          <div className="max-w-md space-y-6">
            <h1 className="text-4xl font-extrabold tracking-tight leading-tight">
              Bienvenue chez NeoBank
            </h1>
            <p className="text-lg opacity-90">
              Gérez vos finances en toute simplicité, où que vous soyez. Une banque 100% digitale à portée de clic.
            </p>
            <img
              src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80"
              alt="Illustration finance digitale"
              className="rounded-lg shadow-lg"
            />
          </div>
        </section>

        {/* Right side - form */}
        <section className="flex flex-col justify-center w-full md:w-1/2 px-8 py-16 bg-gray-50">
          <div className="max-w-md mx-auto bg-white p-10 rounded-3xl shadow-xl">
            <h2 className="text-3xl font-bold text-gray-900 mb-2 text-center">
              Connexion à votre compte
            </h2>
            <p className="text-center text-gray-600 mb-8">
              Bienvenue chez <span className="font-semibold text-blue-600">NeoBank</span>
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Adresse e-mail
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                  placeholder="vous@example.com"
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  Mot de passe
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                  placeholder="••••••••"
                />
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center space-x-2">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <span className="text-gray-900 text-sm select-none">Se souvenir de moi</span>
                </label>

                <a href="#" className="text-sm text-blue-600 hover:text-blue-500 font-medium">
                  Mot de passe oublié ?
                </a>
              </div>

              {error && (
                <div className="text-red-600 text-sm font-medium text-center">{error}</div>
              )}

              {successMessage && (
                <div className="text-green-600 text-sm font-medium text-center">{successMessage}</div>
              )}

              <button
                type="submit"
                disabled={loading}
                className={`w-full py-3 rounded-xl text-white font-semibold transition ${
                  loading ? "bg-blue-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
                } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
              >
                {loading ? "Connexion..." : "Se connecter"}
              </button>
            </form>

            <p className="mt-8 text-center text-gray-600 text-sm">
              Pas encore de compte ?{" "}
              <a href="#" className="text-blue-600 font-semibold hover:text-blue-500">
                Créer un compte
              </a>
            </p>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t text-center py-4 text-gray-500 text-sm select-none">
        © {new Date().getFullYear()} Vaelix Bank. Tous droits réservés.
      </footer>
    </div>
  );
};

export default Login;