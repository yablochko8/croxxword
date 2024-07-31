

export const LogoExplainer = () => {
    return (
        <div>
            <div className="flex items-center bg-gray-100 rounded-lg p-4 shadow-md mb-4">
                <img src="/logos/android-chrome-512x512.png" alt="Croxxword Logo" className="w-16 h-16 mr-4 rounded-lg" />
                <div>
                    <h1 className="text-2xl font-bold text-gray-800 bg-clip-text text-transparent bg-gradient-to-r from-green-800 to-green-700">CRO✘✘WORD.com</h1>
                    <p className="text-sm mt-2 text-gray-600">
                        Clues by real humans. If you solve it, you can add your clues to future crosswords.
                    </p>
                </div>
            </div>
        </div>
    )
}