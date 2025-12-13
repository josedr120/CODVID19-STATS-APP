function Footer() {
  return (
    <footer className="footer footer-center p-6 bg-base-100 text-base-content mt-auto">
      <aside>
        <p className="font-medium">
          Data provided by{' '}
          <a
            href="https://disease.sh/"
            target="_blank"
            rel="noopener noreferrer"
            className="link link-primary"
          >
            disease.sh
          </a>
        </p>
        <p className="text-sm opacity-70">
          Built with React, Redux Toolkit, Tailwind CSS & DaisyUI
        </p>
        <p className="text-sm opacity-70">
          © {new Date().getFullYear()} COVID-19 Stats App by{' '}
          <a
            href="https://github.com/josedr120"
            target="_blank"
            rel="noopener noreferrer"
            className="link link-primary"
          >
            JoseDR120
          </a>
        </p>
      </aside>
    </footer>
  )
}

export default Footer
