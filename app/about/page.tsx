import Head from 'next/head'

export default function Home() {
  return (
    <>
      <Head>
        <title>GAN Fashion Design Generator</title>
        <link rel="canonical" href="/" />
      </Head>

      <div className="min-h-screen bg-background">

        <main className="container mx-auto px-4 py-16" id="fashion-generator">
                    <h1> about </h1>
        </main>

        {/* Footer */}
        <footer className="border-t border-border py-8">
          <div className="container mx-auto px-4 text-center">
            <p className="text-sm text-muted-foreground">
              GAN Fashion Design Generator - Powered by Neural Networks
            </p>
          </div>
        </footer>
      </div>
    </>
  )
}
