import React from "react";
import {StyleSheet, Text, View} from "react-native";
import {useTheme} from "@react-navigation/native";

export const CopyRightScreen = () =>{
  const {colors, font} = useTheme();
  const style = getStyle(colors);

  return(
      <View style={style.container}>
        <Text style={{color: colors.text, fontFamily: font.fontFamily}}>
          KanjiStrokeOrders Font:
          {"\n"}{"\n"}
          Copyright (C) 2004-2020 Ulrich Apel, the AAAA project and the Wadoku project
          All rights reserved.
          {"\n"}{"\n"}
          1. Redistributions of source code must retain the above copyright
          notice, this list of conditions and the following disclaimer.
          {"\n"}
          2. Redistributions in binary form must reproduce the above copyright
          notice, this list of conditions and the following disclaimer in the
          documentation and/or other materials provided with the distribution.
          {"\n"}
          3. Neither the name of the author may be used to endorse or promote products
          derived from this software without specific prior written permission.
          {"\n"}{"\n"}
          THIS SOFTWARE IS PROVIDED BY THE AUTHOR ``AS IS'' AND ANY EXPRESS OR
          IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
          OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
          IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY DIRECT, INDIRECT,
          INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT
          NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
          DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY
          THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
          (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF
          THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
        </Text>
      </View>
  )
};

const getStyle = (colors) => {
  return StyleSheet.create({
    container: {
      margin: 10,
      padding: 10,
      backgroundColor: colors.card,
      borderColor: colors.border,
      borderWidth: 2,
      borderRadius: 10
    }
  })
};
