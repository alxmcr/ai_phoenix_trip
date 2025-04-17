export default function Footer() {
  return (
    <footer className="py-12 border-t bg-muted/30 flex justify-center items-center w-full">
      <div className="container">
        <div className="mt-12 pt-8 border-t border-border/40">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-sm text-muted-foreground">
              © 2025 Phoenix Trip. All rights reserved.
            </div>
            <div className="text-xs text-muted-foreground">
              <p className="text-center">Attributions:</p>
              <ul>
                <li>
                  <a
                    href="https://www.vecteezy.com/free-vector/travel"
                    className="hover:text-primary transition-colors text-center"
                  >
                    Travel Vectors by Vecteezy
                  </a>
                </li>
                <li>
                  <a href="https://www.vecteezy.com/free-vector/background">
                    Background Vectors by Vecteezy
                  </a>
                </li>
                <li>
                  <a href="https://www.vecteezy.com/free-vector/hawaii">
                    Hawaii Vectors by Vecteezy
                  </a>
                </li>
                <li>
                  <a href="https://worldvectorlogo.com/">
                    Logos by Worldvectorlogo
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
